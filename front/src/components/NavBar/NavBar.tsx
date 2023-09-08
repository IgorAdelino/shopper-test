import style from './NavBar.module.css'

//Header da aplicação
export default function NavBar() {
  return (
    <div className={style.header}>
    <img src="/src/assets/shopper.png" alt="" />
      <div className={style.buttons}>
        <h3>Dúvidas Frequentes</h3>
        <button className={style.loginButton}>Fazer login</button>
        <button className={style.registerButton}>Crie sua conta</button>
      </div>
    </div>
  )
}