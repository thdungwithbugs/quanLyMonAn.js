//Prototype cho validation quản lý món ăn (bài 1)
function Validation(){
    //Hàm kiểm tra rỗng
    this.kiemTraRong=function(value,errorSelector){
        if (value.trim() === ''){
            document.querySelector(errorSelector).innerHTML = 'Không được bỏ trống !';
            return false;
        }
        document.querySelector(errorSelector).innerHTML = '';
        return true;
    }
    //Hàm kiểm tra số
    this.kiemTraSo=function(value,errorSelector){
        var regexNumber = /^[0-9]+$/;
        if (regexNumber.test(value)){
            document.querySelector(errorSelector).innerHTML='';
            return true;
        }
        document.querySelector(errorSelector).innerHTML='Hãy nhập số !';
        return false;
    }
}