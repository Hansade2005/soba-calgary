#!/bin/bash

# Update all Ontario references to Calgary in the codebase
echo "Updating branding from Ontario to Calgary..."

# Update app directory
find /home/user/soba-calgary/app -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) ! -path "*/node_modules/*" ! -path "*/.next/*" -exec sed -i 's/SOBA Ontario/SOBA Calgary/g' {} \;
find /home/user/soba-calgary/app -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) ! -path "*/node_modules/*" ! -path "*/.next/*" -exec sed -i 's/sobaontario/sobacalgary/g' {} \;
find /home/user/soba-calgary/app -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) ! -path "*/node_modules/*" ! -path "*/.next/*" -exec sed -i 's/Ontario, Canada/Calgary, Canada/g' {} \;
find /home/user/soba-calgary/app -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) ! -path "*/node_modules/*" ! -path "*/.next/*" -exec sed -i 's/Ontario/SOBA Calgary/g' {} \;
find /home/user/soba-calgary/app -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) ! -path "*/node_modules/*" ! -path "*/.next/*" -exec sed -i 's/ontario/calgary/g' {} \;

# Update components directory
find /home/user/soba-calgary/components -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) ! -path "*/node_modules/*" -exec sed -i 's/SOBA Ontario/SOBA Calgary/g' {} \;
find /home/user/soba-calgary/components -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) ! -path "*/node_modules/*" -exec sed -i 's/sobaontario/sobacalgary/g' {} \;
find /home/user/soba-calgary/components -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) ! -path "*/node_modules/*" -exec sed -i 's/Ontario, Canada/Calgary, Canada/g' {} \;
find /home/user/soba-calgary/components -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) ! -path "*/node_modules/*" -exec sed -i 's/Ontario/SOBA Calgary/g' {} \;
find /home/user/soba-calgary/components -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) ! -path "*/node_modules/*" -exec sed -i 's/ontario/calgary/g' {} \;

# Update lib directory
find /home/user/soba-calgary/lib -type f \( -name "*.ts" -o -name "*.js" \) ! -path "*/node_modules/*" -exec sed -i 's/SOBA Ontario/SOBA Calgary/g' {} \;
find /home/user/soba-calgary/lib -type f \( -name "*.ts" -o -name "*.js" \) ! -path "*/node_modules/*" -exec sed -i 's/sobaontario/sobacalgary/g' {} \;
find /home/user/soba-calgary/lib -type f \( -name "*.ts" -o -name "*.js" \) ! -path "*/node_modules/*" -exec sed -i 's/Ontario, Canada/Calgary, Canada/g' {} \;
find /home/user/soba-calgary/lib -type f \( -name "*.ts" -o -name "*.js" \) ! -path "*/node_modules/*" -exec sed -i 's/Ontario/SOBA Calgary/g' {} \;
find /home/user/soba-calgary/lib -type f \( -name "*.ts" -o -name "*.js" \) ! -path "*/node_modules/*" -exec sed -i 's/ontario/calgary/g' {} \;

echo "Branding update complete!"
