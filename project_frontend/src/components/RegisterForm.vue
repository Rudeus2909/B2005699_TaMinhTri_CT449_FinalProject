<template>
    <div class="container">
        <div class="row justify-content-center"
            style="margin-top: 10px;">
            <div class="col-md-4">
                <div class="card shadow-lg">
                    <div class="card-body">
                        <h4 class="display-1 text-center">Đăng ký</h4>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="form-group mb-2">
                                <input

                                    type="text"
                                    class="form-control"
                                    id="name"
                                    placeholder="Nhập tên"
                                    v-model="name"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <input

                                    type="text"
                                    class="form-control"
                                    id="phone"
                                    placeholder="Nhập số điện thoại"
                                    v-model="phone"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <label for="">Ngày sinh</label>
                                <input
                                 type="date"
                                    class="form-control"
                                    id="birthdate"
                                    placeholder="Nhập ngày sinh"
                                    v-model="birthdate"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <input

                                    type="text"
                                    class="form-control"
                                    id="gender"
                                    placeholder="Nhập giới tính"
                                    v-model="gender"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <input

                                    type="text"
                                    class="form-control"
                                    id="address"
                                    placeholder="Nhập địa chỉ"
                                    v-model="address"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <input
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    placeholder="Nhập mật khẩu"
                                    v-model="password"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <input

                                    type="password"
                                    class="form-control"
                                    id="password"
                                    placeholder="Xác nhận mật khẩu"
                                    v-model="password_confirmation"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <input

                                type="checkbox"
                                class="custom-control-input custom-checkbox-input"
                                id="remember"
                            />
                            </div>
                            <div class="form-group mt-3">
                                 <button
                                type="submit"
                                class="btn btn-primary btn-purple"
                                @click.prevent="signup"
                                >
                                    Đăng ký
                                </button>
                            </div>
                            <div class="form-group mt-3">
                                 <span class="text-muted">  
                                  Đã có tài khoản?
                               
                                </span>
                            <span class="text-muted">
                                <router-link to="/login">
                                    <a href="#">Đăng nhập</a>
                                </router-link>
                            </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'

import {ref} from 'vue'


export default defineComponent({
  setup() {
    const name = ref('')
    const phone = ref('')
    const birthdate = ref('')
    const gender = ref('')
    const address = ref('')
    const password = ref('')
    const password_confirmation = ref('')

    return {
      name,
      phone,
      birthdate,
      gender,
      address,
      password,
      password_confirmation,
      signup() {
        if (this.password !== this.password_confirmation) {
          alert('Password confirmation does not match password')
          return
        }
        else {
            console.log(this.name, this.phone,this.birthdate, this.gender, this.address, this.password, this.password_confirmation)
            axios.post('http://localhost:3000/api/libraries/register', {
                name: this.name,
                phone: this.phone,
                birthdate: this.birthdate,
                gender: this.gender,
                address: this.address,
                password: this.password
                
            }).then(res => {
                console.log(res.data)
                if (res.status == 200) {
                    this.$router.push('/login')
                }
            }).catch(error => {
                console.log(error);
            })
        }

      }
    }
  },
})
</script>

<style scoped>
.btn-purple {
background: linear-gradient(to right, #6e0e8b, #1b79d1);
color: #fff;
width: 100%;
font-size: large;
}

.btn-purple:hover{
background: linear-gradient(to right, #1b79d1, #6e0e8b);
filter: drop-shadow(0 0 0.2em #646cffaa);

}
.custom-checkbox-input {
width: 30px;
height: 30px;
margin-right: 10px;
background-color: purple;
border: none;
border-radius: 5px;
outline: none;
}

.custom-checkbox-label {
font-size: 1.2rem;
}
.card {
background: linear-gradient(to bottom, #1fc25b, #1bbfd1);
color: #fff;
}
</style>
