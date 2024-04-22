
<template>
    <header>
        <nav>
            <label for="" class="logo">Thư viện</label>
            <ul>
                <li><router-link :to="{ name: 'library' }">Trang chủ</router-link></li>
                <li><router-link :to="{ name: 'borrow.list' }">Mượn sách</router-link></li>
                <li><router-link :to="{ name: 'login' }">Đăng xuất</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<style>
header {
    background-color: #333;
    color: #fff;
    padding: 20px 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
}
.logo {
    font-size: 32px;
    font-weight: bold;
    text-transform: uppercase;
}

.logo a {
    color: #fff;
    text-decoration: none;
}

nav {
    height: 80px;
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
    background: red;
    transition: .5s;
    color: #fff;
    text-decoration: none;
}
</style>

<!-- <template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Ứng dụng quản lý thư viện</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to=" { name: 'library' }" class="nav-link">
                    Thư viện
                    <i class="fas fa-address-book"></i>
                </router-link>
            </li>
        </div>
    </nav>
</template> -->