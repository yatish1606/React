import {useState, useEffect} from 'react'
import {firebase} from '../firebase'
import {collatedTasksExist} from '../helpers'
import moment from 'moment'

/* selectedProject == the option selected from collatedTasks[] */

export const useTasks = selectedProject => {

    const [tasks, setTasks] = useState([])
    const [archivedTasks, setArchivedTasks] = useState([])

    useEffect(() => {

        let unsubscribe = firebase
            .firestore()
            .collection('tasks')
            .where('userID', '==', 'fnso35u34isncisuisn')

        unsubscribe = selectedProject && !collatedTasksExist(selectedProject) ? 
        unsubscribe = unsubscribe.where('projectID', '==', selectedProject) :
        selectedProject === 'TODAY' ? 
        unsubscribe = unsubscribe.where('date', '==', moment().format('DD/MM/YYYY')) : 
        selectedProject === 'INBOX' || selectedProject === 0 ? 
        unsubscribe = unsubscribe.where('date', '==' , '') : unsubscribe 

        unsubscribe.onSnapshot(snapshot => {
            const newTasks = snapshot.docs.map(task => ({
                id : task.id,
                ...task.data(),
            }))
        })

        /*
            If selectedProject === the next 7 days, set tasks[] to all the tasks which are less 
            than 7 days far (difference between that task and today <= 7) from today , and which are not archived 
            else return all the tasks which are not archived
        */
        setTasks(
            selectedProject === 'NEXT_7' ? 
            newTasks.filter(task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 && task.archived !== true ) : 
            newTasks.filter(task => task.archived !== true )
        )

        setArchivedTasks(newTasks.filter(task => task.archived !== false))

        return () => unsubscribe()

    }, [selectedProject])

    return {tasks, archivedTasks}
}

export const useProjects = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        firebase
            .firestore()
            .collection('projects')
            .where('userID', '==', 'fnso35u34isncisuisn')
            .orderBy('projectID')
            .get()
            .then(snapshot => {
                const allProjects = snapshot.docs.map(project => ({
                    ...project.data(),
                    docId : project.id
                }))

                if(JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                    setProjects(allProjects)
                }
            })
    }, [projects])

    return {projects, setProjects}
}