import "./styles.css";

const UploadImage = ({value: file, onChange}) => {

  return (
    <div>
      <input type="file" onChange={e => onChange(e.target.files[0])} accept="image/*" />
    </div>
  )
}

export default UploadImage;