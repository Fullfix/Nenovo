import React, { useState } from 'react'
import { useContext } from 'react'
import UserContext from '../../contexts/UserContext';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import './Settings.css';

const initialTags = [
    'Политика',
    'Экономика',
]

const getInitialTags = (keywords) => {
    const tagsToRemove = [];
    for (const keyword of keywords) {
        if (initialTags.includes(keyword)) {
            tagsToRemove.push(keyword);
        }
    }
    return initialTags.filter(tag => !tagsToRemove.includes(tag));
}

const Settings = () => {
    const { user, changeKeywords } = useContext(UserContext);
    const [keywords, setKeywords] = useState(user.data.keyWords);
    const [recommended, setRecommended] = useState(getInitialTags(keywords));

    const addKeyword = (keyword) => {
        if (keywords.includes(keyword)) {
            return false;
        } else {
            setKeywords([...keywords, keyword]);
            return true;
        }
    }
    const onTagsChange = (tags) => {
        const appendedTag = tags.filter(tag => !keywords.includes(tag))[0];
        const removedTag = keywords.filter(tag => !tags.includes(tag))[0];
        console.log(appendedTag);
        console.log(removedTag);
        if (appendedTag && recommended.includes(appendedTag)) {
            setRecommended(recommended.filter(tag => tag !== appendedTag));
        }
        if (removedTag && initialTags.includes(removedTag)) {
            setRecommended([...recommended, removedTag]);
        }
        setKeywords(tags);
    }
    const removeAll = () => {
        setRecommended(initialTags);
        setKeywords([]);
    }

    return (
        <div className="settings-page">
            <section className="info-section">
                <div className="info-email">{user.email}</div>
                <div className="info-logout">Выйти</div>
            </section>
            <section className="keywords-section">
                <header>
                    <div className="keywords-title">Ваши настройки</div>
                    <button className="keywords-save"
                    onClick={async () => {
                        const { error, ...other } = await changeKeywords(keywords);
                        console.log('FINISHED SAVING');
                        console.log(other.keywords);
                        console.log(error);
                    }}>Сохранить</button>
                </header>
                <main>
                    <div className="main-title">
                        Выбери рекомендованные или создай свои ключевые слова:
                    </div>
                    <div className="recommended-tags">
                        <div className="scrollbared">
                            {recommended.map(tag => 
                            <div className="react-tagsinput-tag recom-tag"
                            key={tag}
                            onClick={() => {
                                const added = addKeyword(tag);
                                if (added) {
                                    setRecommended(recommended
                                        .filter(recom => recom !== tag));
                                }
                            }}>
                                {tag}
                            </div>)}
                        </div>
                    </div>
                    <TagsInput 
                    value={keywords}
                    onlyUnique={true}
                    onChange={onTagsChange}
                    maxTags={50}
                    inputProps={{
                        placeholder: 'Введите ключевое слово',
                        style: { width: '160px' }
                    }}/>
                    <div className="delete-all-tags" onClick={removeAll}>
                        Удалить все
                    </div>
                </main>
            </section>
        </div>
    )
}

export default Settings
