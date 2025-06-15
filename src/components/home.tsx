import React from 'react'
import Card from './card'

const Home: React.FC = () => {
    const cards = [
    { title: 'گزارش دهی', description: 'گزارش های جامع و دقیق از زمان صرف شده بر روی هر وظیفه دریافت کنید.' },
    { title: 'رابط کاربری ساده', description: 'با رابط کابری ساده و کاربرپسند ما، به راحتی وظایف خود را مدیریت کنید.' },
    { title: 'مدیریت وظایف', description: 'وظایف خود را به ایجاد و تاریخ شروع هرکدام را ذخیره کنید.' },
    { title: 'رهگیری دقیق زمان', description: 'زمان صرف شده برای هر وظیفه را به طور دقیق ثبت و ذخیره کنید.' },
  ];

  return (
    <div>
        <h1>برنامه ردیاب زمان</h1>
        <p>ما یک ابزار کارآمد برای رهگیری زمان و مدیزیت وظایف فراهم کرده ایم که به شما کمک میکند تا</p>
        <p>بهره وری خود را افزایش دهید و امور خود را به بهترین نحو مدیریت کنید</p>
        <button className='bg-purple-700 text-white rounded-sm m-5'>کنترل زمان را به دست بگیرید</button>
        <h3 className="mt-10 mb-5">ویژگی های کلیدی</h3>
        <div className="bg-gray-100 flex flex-wrap justify-center gap-6 p-8">
        {cards.map((card, index) => (
            <Card key={index} title={card.title} description={card.description} />
        ))}
    </div>
    </div>
  )
}

export default Home