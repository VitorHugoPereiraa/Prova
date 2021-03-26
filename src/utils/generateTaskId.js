import { db } from '../fire'

async function GenerateTaskId(){
   return await (await db.collection('tarefas').get()).docs.length++ + 1
}

export { 
    GenerateTaskId
}