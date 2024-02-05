import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Card, Row, Col, Spin } from 'antd';
import FavePoke from './components/FavePoke';

function App() {
  const [poke, setPoke] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);

  useEffect(() =>  {
    let abortController = new AbortController();
    const loadPoke = async () => {
      try {
        setLoading(true);
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`, {
          signal: abortController.signal
        });
        setPoke(response.data);
        setError("");
      } catch (error) {
        setError("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    }
    loadPoke();
    return () => abortController.abort();
  }, [number]);

  const ClickNext = () => {
    setNumber((number) => number + 1);
  }

  const ClickPrevious = () => {
    setNumber((number) => number - 1);
  }

  const AddFav = () => {
    setFav((oldState => [...oldState, poke]));
  }

  console.log("Pokemon ID " + number);
  console.log("Your Fave Pokemon" + fav);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={14} lg={14} xl={14}>
        <Card bordered={false}>
          <div>
            {loading ? <Spin tip='Loading' style={{width:'20%',height:'20'}} /> : 
            <div>
            <h1>{poke?.name}</h1>
            <Button onClick={AddFav}>Add to favourite</Button><br/>
            <img style={{width:'60%'}} src={poke?.sprites?.other?.home?.front_default} alt={poke?.name} />
            <ul> {poke?.abilities.map((abil, idx) => (
              <li key={idx}>{abil.ability.name}</li>
            ))}
            </ul>
            <Button onClick={ClickPrevious}>Previous</Button>
            <Button style={{marginLeft:'10px', marginTop:'10px'}} onClick={ClickNext}>Next</Button>
              </div>}
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={10} lg={10} xl={10}>
      <h1>Your Fav Pokemon</h1>
        <FavePoke fav={fav} />
      </Col>
    </Row>
  );
}

export default App;
