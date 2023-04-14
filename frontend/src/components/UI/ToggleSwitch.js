import classes from "./ToggleSwitch.module.css";
  
const ToggleSwitch = ({ label, value, onChange, onClick }) => {
  return (
    <div className={classes.container}>
      <div className={classes.labelWrapper}>
        {label}{""}
    
      <div className={classes.toggleSwitch}>
        <input type="checkbox" className={classes.checkbox} name={label} id={value} value={value} onChange={onChange} onClick={onClick}/>
        <label className={classes.value} htmlFor={value}>
          <span className={classes.inner} />
          <span className={classes.switch} />
        </label>
        </div>
      </div>
    </div>
  );
};
  
export default ToggleSwitch;