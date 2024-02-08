import { ErrorMessage, Field } from "formik";

type Option = {
  value: number;
  label: string;
};

type Props = {
  label: string;
  name: string;
  options: Option[];
};

const FormikSelect = (props: Props) => {
  return (
    <div>
      <label className="form-label">{props.label}</label>
      <Field as="select" className="form-select" name={props.name}>
        {props.options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage name={props.name}>
        {message => <p className="badge small bg-danger text-end">{message}</p>}
      </ErrorMessage>
    </div>
  );
};

export default FormikSelect;
