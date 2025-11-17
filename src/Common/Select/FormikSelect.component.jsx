import ReactSelect from 'react-select';
import proptypes from 'prop-types';

const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#1f2d3b",
    borderColor: state.isFocused ? "rgba(13, 110, 253, .25)": "#474747",
    boxShadow: state.isFocused ? "0 0 0 1px rgba(13, 110, 253, .25)" : "none",
    "&:hover": {
      borderColor: "rgba(13, 110, 253, .25)"
    },
  }),

  singleValue: (base) => ({
    ...base,
    color: "#d3d9dc", // text inside the select
  }),

  input: (base) => ({
    ...base,
    color: "#d3d9dc", // text inside the select
  }),


  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#123869ff"
      : state.isFocused
      ? "#4679c2ff"
      : "#1f2d3b",
    color: "#d3d9dc",
    cursor: "pointer"
  }),

  menuList: (base) => ({
    ...base,
    backgroundColor: "#1f2d3b",
    paddingTop: 0,
    paddingBottom: 0,
  }),

  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: "#474747",
  }),

  placeholder: base => ({
    ...base,
    color: "#888"
  }),

  // stules for multi select
  // The “pill” (tag) container
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#cce4ff' : '#1f818e', 

    borderRadius: 50,
    padding: '0px 4px',
  }),

  // The text label inside the pill
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: '6px'
  }),

  // The remove (×) icon inside the pill
  multiValueRemove: (provided, state) => ({
    ...provided,
    color: state.isFocused ? '#fff' : 'd3d9dc',
    ':hover': {
      backgroundColor: '#1f818e',
      color: '#771717',
    },
    height: '25px',
    borderRadius: '50%',
    padding: 2,
  }),
};


const FormikSelect = ({
  name = '',
  options = [],
  defaultValue = null,
  isDisabled = false,
  placeholder = "Select and option",
  isMulti = false,
  values = null,
  setFieldValue,
  setFieldTouched,
  showError = "",
}) => {

  const getSelected = () => {
    if(!values) return null
    if (isMulti) {
      return options.filter(opt => values[name]?.includes(opt.value));
    } else {
      const selected = options.find(opt => opt.value?.toString() === values[name]?.toString()) 
      return selected || null;
    }
  };

  const handleChange = (selected) => {
    if (isMulti) {
      setFieldValue(
        name,
        selected ? selected.map(opt => opt.value) : []
      );
    } else {
      setFieldValue(name, selected ? selected.value : '');
    }
  };

  const handleBlur = () => {
    setFieldTouched(name, true);
  };

  return (
    <>
      <ReactSelect
        aria-label={name}
        classNamePrefix="rs"
        className="select"
        defaultValue={defaultValue}
        isClearable={false}
        isSearchable={true}
        name={name}
        options={options}
        value={getSelected()}
        styles={customStyles}
        isDisabled={isDisabled}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        isMulti={isMulti}
        closeMenuOnSelect={!isMulti}
      />
      {showError && (
        <div style={{ color: 'red', marginTop: 4 }}>
          {showError}
        </div>
      )}
  </>
  )
}

FormikSelect.propTypes = {
  options: proptypes.array,
  value: proptypes.object,
  defaultValue: proptypes.object,
  onChange: proptypes.func,
  name: proptypes.string,
  isDisabled: proptypes.bool,
  placeholder: proptypes.string,
  formik: proptypes.object,
  isMulti: proptypes.bool,
  values: proptypes.object,
  setFieldValue: proptypes.func,
  setFieldTouched: proptypes.func,
  showError: proptypes.string
}

export default FormikSelect