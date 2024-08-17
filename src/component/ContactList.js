import ContactItem from './ContactItem';
import SearchBox from './SearchBox';
import { useSelector } from 'react-redux';

const ContactList = () => {
  
  const filteredList = useSelector(state => state.filteredList);

  return (
    <div>
      <SearchBox />
      <div className="total-count">현재 연락처에는 <strong>{filteredList.length}</strong>건이 있습니다.</div>
      {filteredList.map((item, index) => <ContactItem item={item} key={index}/>)}
    </div>
  )
};

export default ContactList;
