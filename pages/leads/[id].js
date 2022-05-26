import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io.connect("https://young-ridge-50048.herokuapp.com/");

function Leads({ props }) {
  const [contacts, setContacts] = useState(props.contacts);

  useEffect(() => {
    socket.emit("join_room", props.userId);
  }, [props.userId]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateContact = (data) => {
    setContacts([...contacts, data]);
  };

  useEffect(() => {
    socket.on("receive_contact", updateContact);
    return () => socket.off("receive_contact", updateContact);
  }, [updateContact]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ marginTop: "50px" }}>
        <h1>Your Webhook URL</h1>
        <div
          style={{
            backgroundColor: "#eee",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>{props.webhookUrl}</h3>
        </div>
      </div>
      <div style={{ marginTop: "50px" }}>
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
  const userId = ctx.query.id;
  await fetch(`https://young-ridge-50048.herokuapp.com//leads/${userId}`, {
    method: "POST",
  });

  const response = await fetch(
    `https://young-ridge-50048.herokuapp.com/leads/${userId}`
  );
  const result = await response.json();
  return {
    props: { ...result, userId },
  };
};

export default Leads;
