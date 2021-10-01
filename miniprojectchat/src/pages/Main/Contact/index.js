import {gql, useQuery} from "@apollo/client";
import ContactList from "../../../components/ContactList";

const GET_USERS = gql`
query MyQuery($order_by: [users_order_by!] = {name: desc}) {
    users(order_by: $order_by) {
      id
      name
      picture
    }
  }
  `;

const Contact = () => {
    const { data } = useQuery(GET_USERS, {variables: { order_by: {
        name: "desc"} },
        });
        console.log("data",data);
    return ( 
    <div>
        {data.users.map((u) => {
            return <ContactList user={u}></ContactList>;
        })}
    </div>
    );
};

export default Contact;