const onView = async () => {
    const bno = new URL(location.href).searchParams.get('bno');
    console.log(`onView: ${bno}`);

    try {
        const bno = new URL(location.href).searchParams.get('bno');

        const option = { method: 'GET' };
        const response = await fetch(`/BookAdmin/book/view?bno=${bno}`, option);
        const dto = await response.json();

        // <li>도서번호: <span id="bookNo"></span></li>
        //     <li>도서명: <span id="bookName"></span></li>
        //     <li>저자: <span id="bookWriter"></span></li>
        //     <li>출판사: <span id="bookCompany"></span></li>
        //     <li>생성일: <span id="bookInDate"></span></li>
        //     <li>수정일: <span id="bookPutDate"></span></li>

        // dto{bno / bname / bwriter / bcompany / indate / putdate}
        // {
        //     "bno": 6,
        //     "bname": "sample",
        //     "bwriter": "sample",
        //     "bcompany": "sample",
        //     "indate": "2025-02-10 11:29:45",
        //     "putdate": null
        // }

        document.querySelector('#bookNo').innerHTML = bno;
        document.querySelector('#bookName').innerHTML = dto.bname;
        document.querySelector('#bookWriter').innerHTML = dto.bwriter;
        document.querySelector('#bookCompany').innerHTML = dto.bcompany;
        document.querySelector('#bookInDate').innerHTML = dto.indate;
        document.querySelector('#bookPutDate').innerHTML = dto.putdate;
    } catch (error) {
        console.error('error:', error.message);
    }
}
onView();

const onDelete = async () => {
    const bno = new URL(location.href).searchParams.get('bno');
    console.log(`view.js onDelete: ${bno}`);

    try {
        const bno = new URL(location.href).searchParams.get('bno');

        const option = { method: 'DELETE' };
        const response = await fetch(`/BookAdmin/book?bno=${bno}`, option);
        const dto = await response.json();

        if (result == true) {
            alert('도서 삭제 성공');
        } else {
            alert('!! 도서 삭제 실패');
        }
        location.href = 'index.html';
        
    } catch (error) {
        console.error('error:', error.message);
    }
}