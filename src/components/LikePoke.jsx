import { Button } from 'antd';
import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa";

function LikePoke() {
    const [like, setLike] = useState(false);

    const ClickLike = () => {
        setLike((check) => !check)
    }

  return (
    <Button onClick={ClickLike}>
        {like ? <FaHeart style={{color:'red'}}/> : <FaRegHeart/>}
    </Button>
  )
}

export default LikePoke