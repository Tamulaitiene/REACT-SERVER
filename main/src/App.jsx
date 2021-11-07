import axios from "axios";
import { useEffect, useState } from "react";
import ZooCreate from "./Components/ZooCreate";
import ZooList from "./Components/ZooList";
import ZooModal from "./Components/ZooModal";
import ZooNav from "./Components/ZooNav";
import animalSort from "./Common/animalsSort";
function App() {


    const [animals, setAnimals] = useState([]);
    const [lastUpdate, setLastUpdate] = useState(Date.now())
    const [showModal, setShowModal] = useState(false)
    const [modalAnimal, setModalAnimal] = useState({
        name: '',
        type: '',
        weight: '',
        born: ''
    })
    const [types, setTypes] = useState([])
    const [filterBy, setFilterBy] = useState('')
    const [searchBy, setSearchBy] = useState('')
    const [sortBy, setSortBy] = useState('')

    const dateOnly = (data) => {
        return data.map(a => {
            a.born = a.born.slice(0, 10);
            return a;
        });
    }

    // const sort = (by) => {
    //     setAnimals(animalSort(animals, by));
    //     setSortBy(by);
    // }

    useEffect(() => {
        if (sortBy) {
            setAnimals(animalSort(animals, sortBy));
        }
    }, [sortBy])


    useEffect(() => {
        if (filterBy) {
        axios.get('http://localhost:3003/animals-filter/'+filterBy)
            .then(res => {
                setAnimals(dateOnly(res.data));
            })
        }
    }, [filterBy])


    useEffect(() => {
        if (searchBy) {
        axios.get('http://localhost:3003/animals-name/?s='+searchBy)
            .then(res => {
                setAnimals(dateOnly(res.data));
            })
        }
    }, [searchBy])


    useEffect(() => {
        axios.get('http://localhost:3003/animals')
            .then(res => {
                // setAnimals(animalSort(dateOnly(res.data), sortBy));
                setAnimals(dateOnly(res.data));
            })
    }, [lastUpdate])

    useEffect(() => {
        axios.get('http://localhost:3003/animals-type')
            .then(res => {
                setTypes(res.data);
            })
    }, [lastUpdate])

    const create = animal => {
        axios.post('http://localhost:3003/animals', animal)
            .then(() => {
                setLastUpdate(Date.now());
            })
    }

    const edit = (animal, id) => {
        setShowModal(false);
        axios.put('http://localhost:3003/animals/'+id, animal)
            .then(() => {
                setLastUpdate(Date.now());
            })
    }

    const remove = (id) => {
        setShowModal(false);
        axios.delete('http://localhost:3003/animals/'+id)
            .then(res => {
                console.log(res.data);
                setLastUpdate(Date.now());
            })
    }

    const reset = () => {
        setLastUpdate(Date.now());
    }


    const modal = (animal) => {
        setShowModal(true);
        setModalAnimal(animal);
    }

    const hide = () => {
        setShowModal(false);
    }

    return (
        <div className="zoo">
            <ZooNav types={types} search={setSearchBy} filter={setFilterBy} sort={setSortBy} reset={reset}></ZooNav>
            <ZooCreate create={create}></ZooCreate>
            <ZooList animals={animals} modal={modal}></ZooList>
            <ZooModal edit={edit} remove={remove} hide={hide} animal={modalAnimal} showModal={showModal}></ZooModal>
        </div>
    )
}

export default App;