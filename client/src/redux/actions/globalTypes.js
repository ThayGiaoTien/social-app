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