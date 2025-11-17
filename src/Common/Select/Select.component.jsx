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
  })
};


const Select = ({
  name = '',
  options = [],
  value = '',
  defaultValue = null,
  onChange = () => null,
  isDisabled = false,
  placeholder = "Select and option"
}) => (
  options.length > 0 && <ReactSelect
    aria-label={name}
    classNamePrefix="rs"
    className="select"
    defaultValue={defaultValue}
    isClearable={false}
    isSearchable={true}
    name={name}
    options={options}
    value={value}
    onChange={onChange}
    styles={customStyles}
    isDisabled={isDisabled}
    placeholder={placeholder}
  />
)

Select.propTypes = {
  options: proptypes.array,
  value: proptypes.object,
  defaultValue: proptypes.object,
  onChange: proptypes.func,
  name: proptypes.string,
  isDisabled: proptypes.bool,
  placeholder: proptypes.string,
}

export default Select