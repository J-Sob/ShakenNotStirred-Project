import React from 'react';
import {Button, Input} from '@mui/material'

const ImagePreviewTest = () => {
    return(
        <div>
            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                <Button variant="contained" component="span">
                 Upload
                 </Button>
            </label>
        </div>
    )
}

export default ImagePreviewTest;