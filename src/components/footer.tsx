import {FaFacebook, FaLocationDot, FaTelegram} from "react-icons/fa6";
import {FaGlobe, FaInstagram} from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-[#2D2B4B] text-white">
            <div className="px-28 py-12">
                <div className="flex justify-between">
                    {/* Left Section: Logo and Address */}
                    <div>
                        <div className="flex items-center space-x-3">
                            <img src="/header-logo.svg" alt="Teplodom Logo" width={50} />
                            <div>
                                <h1 className="font-bold text-white">TEPLODOM</h1>
                                <p className="text-sm">Интернет магазин <br /> строй материалов</p>
                            </div>
                        </div>
                        <div className="mt-5 flex items-center space-x-3">
                            <FaLocationDot/>
                            <span>ул.Уста Ширин, рынок <br/> Джамий, дом 134</span>
                        </div>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-3">Быстрые ссылки</h2>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Мастерам</a></li>
                            <li><a href="#" className="hover:underline">Оформление заказа</a></li>
                            <li><a href="#" className="hover:underline">Пользовательское соглашение</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-3">Полезное</h2>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">О нас</a></li>
                            <li><a href="#" className="hover:underline">Поставщикам</a></li>
                            <li><a href="#" className="hover:underline">Возврат товара</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-3">Контакты</h2>
                        <ul className="space-y-2">
                            <li> +998 97 761 62 51</li>
                            <li> +998 93 556 91 31</li>
                        </ul>
                        <div className="mt-3 flex space-x-3">
                            <a href="#"><FaTelegram/></a>
                            <a href="#"><FaInstagram/></a>
                            <a href="#"><FaFacebook/></a>
                            <a href="#"><FaGlobe/></a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-600 pt-6 text-center">
                    <p>© 2021 Teplodom. Все права защищены</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
