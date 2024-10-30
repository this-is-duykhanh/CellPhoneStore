import React from "react";
import { Grid, Typography, IconButton, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const CartItem = ({ item, onQuantityChange, onRemoveItem }) => {
    const handleInputChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (newQuantity >= 0) {
            onQuantityChange(item.id, newQuantity - item.quantity); 
        }
    };

    return (
        <Grid 
            container 
            spacing={2} 
            alignItems="center" 
            sx={{ 
                borderBottom: "1px solid #ddd", 
                paddingBottom: 2, 
                flexDirection: { xs: "column", sm: "row" }, 
                textAlign: { xs: 'center', sm: 'left' } 
            }}
        >
            <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{
                        marginTop: '16px',
                        maxWidth: '150px',  
                        maxHeight: '150px', 
                        borderRadius: '8px',
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={3}>
                <Typography variant="body1" noWrap>{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">{item.category}</Typography>
            </Grid>

            <Grid item xs={12} sm={3} display="flex" alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                <IconButton onClick={() => onQuantityChange(item.id, -1)} aria-label="reduce quantity">
                    <RemoveIcon />
                </IconButton>
                <TextField
                    variant="outlined"
                    type="number"
                    value={item.quantity}
                    onChange={handleInputChange}
                    inputProps={{ min: 0, style: { textAlign: "center", width: "50px" } }}
                />
                <IconButton onClick={() => onQuantityChange(item.id, 1)} aria-label="increase quantity">
                    <AddIcon />
                </IconButton>
            </Grid>

            <Grid item xs={12} sm={2} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
                <Typography variant="body1">${item.price.toFixed(2)}</Typography>
            </Grid>

            <Grid item xs={12} sm={1} display="flex" justifyContent={{ xs: 'center', sm: 'flex-end' }}>
                <IconButton onClick={() => onRemoveItem(item.id)} aria-label="remove item" color="inherit">
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default CartItem;
