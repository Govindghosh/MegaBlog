import React from 'react'
import {useForm} from 'react-hook-form'
import {Button, Input, RTE, Select} from '../index'
import appwriteService from '../../appwrite/configuration'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'


function Postform({post}) {
    const {register, handleSubmit, watch, setValue, control, getValue} = useForm({
        defaultValues:{
            title: post?.title ||'',
            slug: post?.slug || '',
            content:post?.content || '',
            status:post?.status || 'active'
        },

    })
            const navigate =useNavigate()
            const userData=useSelector(state.user.userData)
            const submit = async (data)=>{
                if (post) {
                   const file = data.image[0]?appwriteService.uploadFile(data.image[0]):null
                   if (file) {
                    appwriteService.deleteFile(post.FeaturedImage)

                   }
                    const dbPost =await appwriteService.updatePost(post.$id,{
                        ...data,
                        FeaturedImage: file?file.$id:undefined})
                        if (dbPost) {
                        navigate(`/post/${dbPost.$id}`)
                    }
                }
                else{
                  const file = await appwriteService.uploadFile(data.image[0]);
                    if (file) {
                       const fileId =  file.$id
                       data.FeaturedImage=fileId
                       await //here you go....
                    }
                }

            }
  return (
    <div>
      
    </div>
  )
}

export default Postform
