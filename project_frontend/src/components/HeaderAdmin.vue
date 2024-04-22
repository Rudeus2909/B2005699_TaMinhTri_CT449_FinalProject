<template>
    <nav>
        <label for="" class="logo">Admin</label>
        <ul>
            <li><router-link :to="{ name: 'admin' }">Quản lý sách</router-link></li>
            <li><router-link :to="{ name: 'publisher' }">Quản lý Nhà xuất bản</router-link></li>
            <li><router-link :to="{ name: 'borrow.manager' }">Quản lý Mượn sách</router-link></li>
            <li><router-link :to="{ name: 'login' }">Đăng xuất</router-link></li>
        </ul>
    </nav>
</template>

<style>
*{
    padding: 0;
    margin: 0;
    text-decoration: none;
    list-style: none;
    box-sizing: border-box;
    font-family: montserrat;
}
nav {
    background: #0082e6;
    height: 80px;
    width: 100%;
}
label.logo {
    color: white;
    font-size: 35px;
    line-height: 80px;
    padding: 0 100px;
}
nav ul{
    float: right;
    margin-right: 20px;
}
nav ul li{
    display: inline-block;
    line-height: 80px;
    margin: 0 5px;
}
nav ul li a{
    color: white;
    font-size: 17px;
    padding: 7px 13px;
    border-radius: 3px;
    text-transform: uppercase;
}
a.active, a:hover{
    background: #1b9bff;
    transition: .5s;
}
</style>