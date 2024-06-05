import { initialCards } from './components/cards';
import './pages/index.css';
import { attachCard, deleteCard} from './components/card';

const placesList = document.querySelector('.places__list');

initialCards.forEach((elementValue) => attachCard(elementValue, deleteCard));

export {placesList};
