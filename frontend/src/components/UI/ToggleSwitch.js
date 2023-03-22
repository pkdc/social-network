import classes from "./ToggleSwitch.module.css";
  
const ToggleSwitch = ({ label }) => {
  return (
    <div className={classes.container}>
      <div className={classes.labelWrapper}>
        {label}{""}
    
      <div className={classes.toggleSwitch}>
        <input type="checkbox" className={classes.checkbox} name={label} id={label} />
        <label className={classes.label} htmlFor={label}>
          <span className={classes.inner} />
          <span className={classes.switch} />
        </label>
        </div>
      </div>
    </div>
  );
};
  
export default ToggleSwitch;