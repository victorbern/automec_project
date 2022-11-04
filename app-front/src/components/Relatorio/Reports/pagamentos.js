import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";
import logo from '../../../static/logo.jpg'

function pagamentosPDF(pagamentos){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    // alert(pagamentos.total)


    const reportTitle = [
        {
            image: logo,
            fit:[140,70]
        }
    ];

    const tipos = pagamentos.tipos.map((tipo)  => {
        return [
            {text: tipo.tipo + ' | Total: ' + tipo.total.toFixed(2), fontSize: 12, bold: true, margin: [0, 20, 0, 8]},
            {
                table: {
                    headerRows: 1,
                    widths: ['*','*','*','*'],
                    body: [
                        [
                            {text: 'Código: ', style: 'tableHeader', fontSize: 10},
                            {text: 'Data: ', style: 'tableHeader', fontSize: 10},
                            {text: 'Subtotal: ', style: 'tableHeader', fontSize: 10},
                        ],
                        ...corpoTipos(tipo.pagamentos)

                    ]
                },
                layout: 'lightHorizontalLines'
            }
        ]
    });

    function corpoTipos (pagamentos) {
        return pagamentos.map((pagamento) => {
            return  [
                {text: pagamento.idPagamento, fontSize: 9, margin: [0,2,0,2]}, 
                // {text:  new Date((pagamento.dataHora).split("T")[0]), fontSize: 9, margin: [0,2,0,2]}, 
                {text:  pagamento.dataHora, fontSize: 9, margin: [0,2,0,2]}, 
                {text: pagamento.total.toFixed(2),  fontSize: 9, margin: [0,2,0,2]}, 
            ]
        })
    }

    const details = [
        {
            text: 'Pagamentos',
            fontSize: 24,
            bold: true,
            // margin: [15,20,0,45] // left, top, right, bottom
            alignment:'center'
        },
        {text: 'Total geral: '+ (pagamentos.total).toFixed(2), fontSize: 14, margin: [0, 20, 0, 8]},
        ...tipos
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

export default pagamentosPDF;