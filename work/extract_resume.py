import pdfplumber
p = r'C:\Users\lokar\OneDrive\Desktop\LokeshRam-Resume.pdf'
with pdfplumber.open(p) as pdf:
    with open(r'work\resume.txt', 'w', encoding='utf-8') as out:
        for i, page in enumerate(pdf.pages, 1):
            out.write(f'--- PAGE {i} ---\n{page.extract_text() or ""}\n')
