import { ErrorMessage, Field } from "formik";

type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  htmlFor?: string;
  id?: string;
};

const FormikInput = (props: Props) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.htmlFor} className="form-label">
        {props.label}
      </label>
      <Field
        id={props.id}
        name={props.name}
        type={props.type || "text"}
        className="form-control"
        placeholder={props.placeholder}
      />
      <ErrorMessage name={props.name}>
        {message => <p className="badge small bg-danger text-end">{message}</p>}
      </ErrorMessage>
    </div>
  );
};

export default FormikInput;
