import Time "mo:core/Time";
import Array "mo:core/Array";
import Text "mo:core/Text";
import List "mo:core/List";
import Order "mo:core/Order";
import Int "mo:core/Int";

actor {
  type Message = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Message {
    public func compare(m1 : Message, m2 : Message) : Order.Order {
      Int.compare(m2.timestamp, m1.timestamp);
    };
  };

  let messages = List.empty<Message>();

  public shared ({ caller }) func submitMessage(name : Text, email : Text, message : Text) : async () {
    let newMessage : Message = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    messages.add(newMessage);
  };

  public query ({ caller }) func getAllMessages() : async [Message] {
    messages.toArray().sort();
  };
};
