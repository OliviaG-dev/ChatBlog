import './header.css';
import chats_icone_1 from '../../assets/chats_icone_1.png';
import chats_icone_2 from '../../assets/chats_icone_2.png';

function Header() {
  return (
    <>
      <header>
        <img className="header_img" src={chats_icone_1} alt="icone_chat_1" />
        <h1 className="header_title">ChatBlog</h1>
        <img src={chats_icone_2} alt="icone_chat_2" />
      </header>
    </>
  );
}

export default Header;
