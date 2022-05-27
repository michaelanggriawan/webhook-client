import { useEffect, useState } from "react";
import { io as socket } from "socket.io-client";

const io = socket.connect("https://young-ridge-50048.herokuapp.com/");

function Leads({ props }) {
  const [contacts, setContacts] = useState(props.contacts);

  useEffect(() => {
    io.emit("join_room", props.userId);
  }, [props.userId]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateContact = (data) => {
    setContacts([...contacts, data]);
  };

  useEffect(() => {
    io.on("receive_contact", updateContact);
    return () => io.off("receive_contact", updateContact);
  }, [updateContact]);

  return (
    <div className="container">
      <div className="mt-50 center column">
        <h1>Your Webhook URL</h1>
        <div className="webhook-url">
          <h3>{props.webhookUrl}</h3>
        </div>
      </div>
      <div className="mt-50">
        <table id="contacts">
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
          {contacts.map((contact, index) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <tr>
                <td>{index + 1}</td>
                <td> {contact.name}</td>
                <td> {contact.email}</td>
                <td> {contact.phone}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

Leads.getInitialProps = async (ctx) => {
  const userId = ctx.query.userId;
  const fetchContacts = async () => {
    const response = await fetch(
      `http://young-ridge-50048.herokuapp.com/leads/${userId}`
    );
    const result = await response.json();
    return {
      props: { ...result, userId },
    };
  };

  try {
    // regist a new user
    await fetch(`https://young-ridge-50048.herokuapp.com/leads/${userId}`, {
      method: "POST",
    });
    fetchContacts();
  } catch (err) {
    fetchContacts();
  }
};

export default Leads;
