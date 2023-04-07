import style from './MyInput.module.scss'

const MyInput = ({type, value, onChange}) => {
    return (
        <>
            <input
                className={style.input}
                type={type}
                value={value}
                onChange={onChange}
            />
        </>
    )
}

export default MyInput