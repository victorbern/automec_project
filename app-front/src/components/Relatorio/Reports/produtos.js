import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";

function produtosPDF(produtos){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle = [
        {
            text: 'Produtos mais vendidos',
            fontSize: 24,
            bold: true,
            margin: [15,20,0,45] // left, top, right, bottom
        }
    ];

    const dados = produtos.map((produto) => {
        return [
            {text: produto.codigoBarras, fontSize: 9, margin: [0,2,0,2]}, 
            {text: produto.descricao, fontSize: 9, margin: [0,2,0,2]}, 
            {text: produto.totalVendido,  fontSize: 9, margin: [0,2,0,2]}
        ]
    });

    const details = [
//        {text: 'KENNEDY GATÃO', fontSize: 14, bold: true, margin: [0, 20, 0, 8]},
        {
            table: {
                headerRows: 1,
                widths: ['*','*','*','*'],
				body: [
					[{text: 'Código de Barras', style: 'tableHeader', fontSize: 10}, {text: 'Descrição', style: 'tableHeader', fontSize: 10}, 
                    {text: 'Total Vendido', style: 'tableHeader', fontSize: 10}],
					...dados
				]
            },
            layout: 'lightHorizontalLines'
        }
    ];

    function Rodape(currentPage, pageCount) {
        return [
            {
                text: currentPage + ' / ' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0,10,20,0] // left, top, right, bottom
            }
        ]
    };

    const docDefinitios = {
        pageSize: 'A4',
        pageMargins: [15,50,15,40],

        header: [reportTitle],
        content: [details],
        footer: Rodape
    };
    pdfMake.createPdf(docDefinitios).open({}, window.open('', '_blank'));
}

export default produtosPDF;