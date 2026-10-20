from pypdf import PdfReader
p = r'C:\Users\lokar\OneDrive\Desktop\LokeshRam-Resume.pdf'
r = PdfReader(p)
for page in r.pages:
    for a in page.get('/Annots', []):
        o = a.get_object()
        action = o.get('/A', {})
        if action.get('/URI'):
            print(action.get('/URI'))
