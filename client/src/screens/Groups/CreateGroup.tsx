import CreateButton from "../../components/CreateButton";

const CreateGroup = () => {
  return (
    <>
      <CreateButton
        onClick={() => console.log("Create Group")}
      // style={{display: user && [Roles.Root, Roles.Admin].includes(user.permission) ? "block" : "none"}}
      />
    </>
  );
};

export default CreateGroup;