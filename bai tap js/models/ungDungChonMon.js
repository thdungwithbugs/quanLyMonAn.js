var arrMonAn = [
    {maMonAn:1,tenMonAn:'Nước lẩu haidilao',giaTien:100},
    {maMonAn:2,tenMonAn:'Mì cay thành đô',giaTien:200},
    {maMonAn:3,tenMonAn:'Mực bạch ngọc',giaTien:300},
]


//Tạo lớp đối tượng cho hóa đơn bài tập 2
function MonAnBai2(){
    //Khai báo các biến
    this.maMonAnHoaDon = arrMonAn.maMonAn;
    this.tenMonAnHoaDon = arrMonAn.tenMonAn;
    this.giaTienMonAnHoaDon = arrMonAn.giaTien;
    
}