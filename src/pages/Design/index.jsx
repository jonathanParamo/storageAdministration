import './styles.css';
import Button from "../../components/Button";

const Design = () => {
  return (
    <div className="container">
      <Button label="Guardar" color='primary' variant="contained" size="large" onClick={() => console.log('xxx button 1')}/>
      <Button label="Guardar" color='secondary' variant="outlined" size="medium" onClick={() => console.log('xxx button 2')} />
      <Button label="Guardar" color='tertiary' variant="none" size="small" onClick={() => console.log('xxx button 3')} />
    </div>
  )
}

export default Design;
