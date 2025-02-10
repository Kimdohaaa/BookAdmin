const bookList = async () => {
    console.log('bookList call');
    let bookListContainer = document.querySelector('#bookListContainer');

    let html = '';
    const option = { method: 'GET' };

    try {
        // http://192.168.40.34:8080/BookAdmin/book/view?bno=8
        // arrayList (BookDto)[{bno / bname / bwriter / bcompany / indate / putdate}]        
        // const dtoList = [
        //     {
        //         "bno": 5,
        //         "bname": "sample",
        //         "bwriter": "sample",
        //         "bcompany": "sample",
        //         "indate": "2025-02-10 11:29:44",
        //         "putdate": null
        //     },
        //     {
        //         "bno": 6,
        //         "bname": "sample",
        //         "bwriter": "sample",
        //         "bcompany": "sample",
        //         "indate": "2025-02-10 11:29:45",
        //         "putdate": null
        //     },
        // ];
        const response = await fetch('/BookAdmin/book', option);
        const dtoList = await response.json();

        html += `				
				<table class="table">
                    <thead>
                        <tr>
                            <th>책번호</th>
                            <th>도서명</th>
                            <th>저자</th>
                            <th>출판사</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
			`;
        dtoList.forEach(dto => {
            // arrayList (BookDto)[{bno / bname / bwriter / bcompany / indate / putdate}]
            html += `				
                        <tr>
                            <td>${dto.bno}</td>
                            <td><a href="view.html?bno=${dto.bno}">${dto.bname}</a></td>
                            <td>${dto.bwriter}</td>
                            <td>${dto.bcompany}</td>
                            <td><button class='btn btn-primary' onclick="onDelete(${dto.bno})">삭제하기</button></td>
                        </tr>
			`;
        });
        html += `				
                    </tbody>
                        </table>
                        <button class='btn btn-primary' onclick="location.href='write.html'">도서 생성하기</button>
                </table>
			`;
    } catch (error) {
        console.error('error:', error.message);
    }

    bookListContainer.innerHTML = html;
}
bookList();

const onDelete = async (bno) => {    
    console.log(`index.js onDelete: ${bno}`);

    try {
        const option = { method: 'DELETE' };
        const response = await fetch(`/BookAdmin/book?bno=${bno}`, option);
        const result = await response.json();

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