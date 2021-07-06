export const GLOBALTYPES={
    AUTH: 'AUTH',
    NOTIFY: 'NOTIFY',
    ALERT: 'ALERT',
    THEME: 'THEME',
    STATUS: 'STATUS',
    MODAL: 'MODAL',
    SOCKET: 'SOCKET',
    ONLINE: 'ONLINE',
    OFFLINE:'OFFLINE',
    CALL: 'CALL', 
    PEER: 'PEER'
}
export const DeleteData=(data, id)=>{

    const newData= data.filter(item=>item._id!==id)
    return newData;

}
//  Check it each post of data array has id = post._id then return newData, which has been changed post.
export const EditData=(data, id, post)=>{
    const newData= data.map(item=>
        item._id===id? post: item)
    return newData;

}