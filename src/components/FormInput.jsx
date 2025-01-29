import PropTypes from 'prop-types';

function FormInput({ label, type, id, name, value, onChange, required, step, min }) {
    const isTextarea = type === 'textarea';
    
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            {isTextarea ? (
                <textarea
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    step={step}
                    min={min}
                />
            )}
        </div>
    );
}

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    step: PropTypes.string,
    min: PropTypes.string
};

export default FormInput; 