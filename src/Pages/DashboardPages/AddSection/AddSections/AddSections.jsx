import { Helmet } from "react-helmet-async";
import AddEmployee from "../AddEmployee/AddEmployee";
import AddItem from "../AddItem/AddItem";

const AddSections = () => {
  return (
    <div>
      <Helmet>
        <title>Add Sections | Cosmo School </title>
      </Helmet>
      <AddItem></AddItem>
      <AddEmployee></AddEmployee>
    </div>
  );
};

export default AddSections;
