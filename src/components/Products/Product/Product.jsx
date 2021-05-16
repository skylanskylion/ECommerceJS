import React, {useState} from 'react';
import { Card, CardMedia, CardContent, CardActions, Button, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { AddShoppingCart, Delete, Edit } from '@material-ui/icons';

import useStyles from './styles';

const Product = ({ product, onAddToCart, isEditing, handleDelete }) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const handleAddToCart = () => onAddToCart(product.id, 1);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Card className={classes.root} style={{backgroundColor: '#1BA0F2'}}>
      <CardMedia className={classes.media} image={product.media.source} title={product.name} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
          ₹{product.price.formatted}
          </Typography>
        </div>
        <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" component="p" />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        {
          isEditing
          ? <div>
              <IconButton aria-label="Edit" onClick={() => window.open(`https://dashboard.chec.io/products/${product.id}`, "_self")}>
                <Edit />
              </IconButton>
              <IconButton aria-label="Delete" onClick={() => setVisible(true)}>
                <Delete />
              </IconButton>
            </div> 
          : <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
              <AddShoppingCart />
            </IconButton>
        }
        <Dialog
          open={visible}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"CONFIRMATION"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete the item ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {handleDelete(product.id); handleClose();}} color="primary">
              Confirm
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
};

export default Product;

