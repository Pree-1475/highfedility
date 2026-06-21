from products.models import Product

def clean_price(price_str):
    if not price_str:
        return price_str
    # Extract only numeric characters and decimals
    cleaned = ''.join(c for c in price_str if c.isdigit() or c == '.')
    return cleaned

updated_count = 0
for product in Product.objects.all():
    original = product.price
    cleaned = clean_price(original)
    if original != cleaned:
        product.price = cleaned
        product.save()
        updated_count += 1
        print(f"Updated '{original}' -> '{cleaned}' for {product}")

print(f"Total products updated: {updated_count}")
