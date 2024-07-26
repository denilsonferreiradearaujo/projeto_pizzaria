import { useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head'
import { Header } from '@/src/components/Header';
import styles from '../product/style.module.scss';
import { toast } from 'react-toastify';

import { canSSRAuth } from '@/src/utils/canSSRAuth';

import { FiUpload } from 'react-icons/fi';

import { setupAPICliente } from '../../services/api';

type ItemProps = {
    id: string,
    name: string
}

interface CategoryProps {
    categoryList: ItemProps[];
}

export default function Product({categoryList}: CategoryProps){
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [imageAvatar, setImageAvatar] = useState<File | null>(null); // Aceita tanto null quanto File
    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0)

    function handleFile(e: ChangeEvent <HTMLInputElement> ){
        if(!e.target.files){
            return;
        }

        const image = e.target.files[0];

        if(!image){
            return;
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png'){

            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            // setAvatarUrl(URL.createObjectURL(image));
        }
    }

    // Quando voce seleciona uma nova categoria na lista
    function hadleChangeCategory(event: ChangeEvent<HTMLSelectElement>){
        // console.log("posição selecionada", event.target.value)
        setCategorySelected(Number(event.target.value))
    }

    async function handleRegister(event: FormEvent){
        event.preventDefault();

        try{
            const data = new FormData();

            if(name === "" || price === "" || description === "" || imageAvatar === null){
                toast.error("Preencha todos os campos!");
                return;
            }

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelected].id);
            data.append('file', imageAvatar);

            const apiCliente = setupAPICliente();

            await apiCliente.post('/product', data)

            toast.success('Produto cadastrado com sucesso!')

        }catch(err){
            console.log('Erro', err);
            toast.error('Ops! Erro ao cadastrar')
        }

        setName('');
        setPrice('');
        setDescription('');
        setImageAvatar(null);
        setAvatarUrl('');
    }

    return(
        <>
            <Head>
                <title>Novo produto - Pizzaria</title>
            </Head>

            <div>
                <Header/>

                <main className={styles.container}>
                    <h1>Novo produto</h1>
            
                    <form className={styles.form} onSubmit={handleRegister}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color='#fff'/>
                            </span>

                            <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

                            {avatarUrl &&(
                                <img
                                    className={styles.preview}
                                    src={avatarUrl}
                                    alt="Foto do produto"
                                    width={250}
                                    height={250} 
                                />
                            )}

                            
                        </label>

                        <select value={categorySelected} onChange={hadleChangeCategory}>
                            {categories.map( (item, index) =>{
                                return(
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}  
                        </select>

                        <input
                            type='text'
                            placeholder='Digite o nome do produto'
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type='text'
                            placeholder='Preço do produto'
                            className={styles.input}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <textarea 
                            placeholder='Descreva o produto'
                            className={styles.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            
                        />

                        <button className={styles.buttonAdd} type='submit'>
                            Cadastrar
                        </button>
                    </form>

                </main>

            </div>

        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiCliente = setupAPICliente(ctx);

    const response = await apiCliente.get('/category')
    // console.log(response.data)

    return{
        props:{
            categoryList: response.data
        }
    }
})