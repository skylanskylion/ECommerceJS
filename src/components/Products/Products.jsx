import React, {useState, useEffect} from 'react';
import {Grid, Select, MenuItem, InputLabel} from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './styles';
import axios from 'axios';

const Products = ({ products, onAddToCart, isEditing }) => {
  const [items, setItems] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [pgRefresh, setPgRefresh] = useState(false);
  const [viewBy, setViewBy] = useState('row');
  const classes = useStyles();
  // console.log(products);

  useEffect(() => {

  }, [pgRefresh]);

  useEffect(() => {
    setItems(products);
  }, [products, items]);

  const handlePgRefresh = () => setPgRefresh(!pgRefresh);

  const handleItemSort = (evt) => {
    setSortBy(evt.target.value);
    if(evt.target.value === 'name'){
      items.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }
    else if(evt.target.value === 'type'){
      items.sort((a,b) => (a.categories[0].name > b.categories[0].name) ? 1 : ((b.categories[0].name > a.categories[0].name) ? -1 : 0));
    }
    else if(evt.target.value === 'date'){
      items.sort((a,b) => (a.created > b.created) ? 1 : ((b.created > a.created) ? -1 : 0));
    }
  };

  const handleViewBy = (evt) => setViewBy(evt.target.value)

  const handleDelete = (id) => {
    axios.delete(`https://api.chec.io/v1/products/${id}`, {
      headers: {
        "X-Authorization": `sk_test_26130e814b678a4bcea02925f0c19659e446513f90190`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
    .then((res) => {
      let temp = items;
      for(let [index, value] of temp.entries()){
        if(value.id === id){
          console.log('deleted', index)
          temp.splice(index, 1);
          break;
        }
      }
      setItems(temp);
      handlePgRefresh();
    })
    .catch(err => console.log(err));
  };

  if (!items.length) return <p>Loading...</p>;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar}/>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
        <InputLabel style={{fontSize: 16, fontWeight: 700, marginRight: 8}}>Sort By:</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={sortBy}
          onChange={handleItemSort}
          style={{minWidth: 100}}
        >
          <MenuItem value='date'>Date</MenuItem>
          <MenuItem value='name'>Name</MenuItem>
          <MenuItem value='type'>Type</MenuItem>
        </Select>
        <InputLabel style={{fontSize: 16, fontWeight: 700, marginRight: 8, marginLeft: 15}}>Sort By:</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={viewBy}
          onChange={handleViewBy}
          style={{minWidth: 100}}
        >
          <MenuItem value='row'>Grid</MenuItem>
          <MenuItem value='column'>List</MenuItem>
        </Select>
      </div>
      <Grid direction={viewBy} container justify="center" spacing={4} style={{alignItems: 'center'}}>
        {items.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3} style={viewBy === 'column' ? {marginBottom: 20, width: 500} : null}>
            {
              sortBy === 'type'
              ? <p style={{fontSize: 18, fontWeight: 700}}>{product.categories[0].name}</p>
              : null
            }
            <Product product={product} onAddToCart={onAddToCart} isEditing={isEditing} handleDelete={handleDelete}/>
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;

