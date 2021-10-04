import {gql, useQuery} from "@apollo/client";
import ContactList from "../../../components/ContactList";
import { Divider } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { selectedUserState } from "../../../recoil";
import { useAuth0 } from "@auth0/auth0-react";

const GET_USERS = gql`
query MyQuery(
    $order_by: [users_order_by!] = { name: desc }
    $_neq: String = ""
  ) {
    users(order_by: $order_by, where: { id: { _neq: $_neq } }) {
      id
      name
      picture
    }
  }
  `;

const Contact = () => {
    const { user } = useAuth0()
    const { data } = useQuery(GET_USERS, {variables: {order_by: {name: "asc"},_neq: user.sub},
    });
    // const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
    const setSelectedUser = useRecoilState(selectedUserState)[1];
    const users = [{id: null, name: "Ruang Ghibah"}]
    if(data && data.users){
        users.push(...data.users)
    }
    console.log("data p",data);
    return(
        <div>
            {users.map((u) => {
    return ( 
        <div key={u.id} onClick={() => setSelectedUser(u)}>
        {/* <div key={u.id}> */}
            <ContactList user={u}></ContactList>;
            <Divider></Divider>
        </div>
    );
    })}
    </div>
    );
};

export default Contact;