import React, {useState, useRef, useEffect}  from "react"
import { useSelector, useDispatch } from "react-redux"
import { GLOBALTYPES } from "../redux/actions/globalTypes"
import {createPost, updatePost} from '../redux/actions/postAction'
import Icons from './Icons.js'
import {imageShow, videoShow} from '../utils/mediaShow'

const StatusModal=()=>{
    const {auth, theme, status} = useSelector(state=>state)
    
    const dispatch= useDispatch()

    const [content, setContent]= useState('')
    const [images, setImages]= useState([])

    const [stream, setStream]= useState(false)
    const videoRef= useRef()
    const refCanvas= useRef()
    const [tracks, setTracks]= useState('')

    const handleChangeImages=e=>{

    }
    const deleteImages=(index)=>{

    }
    const handleStream=()=>{

    }
    const handleCapture=()=>{

    }
    const handleStopStream=()=>{

    }
    const handleSubmit=e=>{

    }
    useEffect(()=>{
        
    },[])
    return (
        <div className='status_modal'>
            <form onSubmit={handleSubmit}>
                <div className='status_header'>
                    <h5 className='m-0'>Create Post</h5>
                    <span onClick={()=>dispatch({
                        type:GLOBALTYPES.STATUS, payload: false
                    })}>
                        &times;
                    </span>
                </div>

                <div className='status_body'>
                    <textarea name='content' value={content}
                    placeholder={`${auth.user.username}, what are you thinking?`}
                    onChange={e=>setContent(e.target.value)}
                    style={{
                        filter: theme? 'invert(1)': 'invert(0)',
                        color: theme ? 'white': '#111',
                        background: theme? 'rgba(0,0,0,.03)':''
                    }}
                    />

                    <div className='d-flex'>
                        <div className='flex-fill'>
                            <Icons setContent={setContent} content={content} theme={theme}/>
                        </div>
                    </div>

                    <div className='show_images'>
                        {
                            images.map((img, index)=>(
                                <div key={index} id='file_img'>
                                    {
                                        img.camera ? imageShow(img.camera, theme) 
                                        : img.url
                                            ?<>
                                                {
                                                    img.url.match(/video/i)
                                                    ? videoShow(img.url, theme)
                                                    : imageShow(img.url, theme)
                                                }
                                            </>
                                            :<>
                                                {
                                                    img.type.match(/video/i)
                                                    ?videoShow(URL.createObjectURL(img), theme)
                                                    : imageShow(URL.createObjectURL(img), theme)
                                                }
                                            </>
                                    }
                                    <span onClick={()=>deleteImages(index)}>&times;</span>
                                </div>    
                            ))
                        }
                    </div>

                    {
                        stream && 
                        <div className='stream position-relative'>
                            <video autoPlay muted ref={videoRef} width='100%' height='100%'
                            style={{filter: theme? 'invert(1)': 'invert(0)'}} />

                            <span onClick={handleStopStream} >&times;</span>
                            <canvas ref={refCanvas} style={{display: 'none'}} />
                        </div>
                    }

                    <div className='input_images'>
                        {
                            stream
                            ? <i className='fas fa-camera' onClick={handleCapture} />
                            : <>
                                <i className='fas fa-camera' onClick={handleStream} />

                                <div className='file_upload'>
                                    <i className='fas fa-image'/>
                                    <input type='file' name='file' id='file'
                                    multiple accept ='image/*, video/*' onChange={handleChangeImages} />
                                </div>
                            </>
                        }
                    </div>
                </div>

                <div className='status_footer'>
                    <button className='btn btn-secondary w-100' type='submit'>
                        Post
                    </button>
                </div>
            </form>
        </div>
    )

}

export default StatusModal