const errorReply = (reply, code, errorMssage) => {
  reply.status(code).send({ error: errorMssage });
};

const createdReply = (reply, code, message) => {
  reply.status(code).send({ message });
};

const updatedReply = (reply, code, message) => {
  reply.status(code).send({ message });
};

const deletedReply = (reply, code, message) => {
  reply.status(code).send({ message });
};

const removedReply = (reply, code, message) => {
  reply.status(code).send({ message });
};

module.exports = {
  errorReply,
  createdReply,
  updatedReply,
  deletedReply,
  removedReply,
};
