import "./styles.scss";
export default function FormInputText({
  handleChange,
  value,
  type,
  name,
  label = false,
}) {
  return (
    <>
      {!!label && <label>{label}</label>}
      <input
        value={value}
        type={type}
        name={name}
        required={true}
        onChange={handleChange}
      />
    </>
  );
}
