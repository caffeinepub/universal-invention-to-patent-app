export interface LegalPhrase {
  phrase: string;
  description: string;
  category: 'claim-structure' | 'transition' | 'qualifier' | 'relationship' | 'action';
}

export const legalPhrases: LegalPhrase[] = [
  // Transition phrases
  { phrase: 'comprising', description: 'Open-ended transition; allows for additional unlisted elements', category: 'transition' },
  { phrase: 'consisting of', description: 'Closed transition; limits claim to only listed elements', category: 'transition' },
  { phrase: 'consisting essentially of', description: 'Semi-closed; allows elements that do not materially affect basic characteristics', category: 'transition' },
  { phrase: 'including', description: 'Open-ended, similar to comprising', category: 'transition' },
  { phrase: 'having', description: 'Open-ended transition used for characteristics or properties', category: 'transition' },
  { phrase: 'wherein', description: 'Introduces a limitation or further defines a previously recited element', category: 'claim-structure' },
  { phrase: 'whereby', description: 'Introduces a result or effect of the claimed structure or method', category: 'claim-structure' },
  // Qualifiers
  { phrase: 'at least one', description: 'Specifies one or more of the recited element', category: 'qualifier' },
  { phrase: 'a plurality of', description: 'Specifies two or more of the recited element', category: 'qualifier' },
  { phrase: 'substantially', description: 'Allows for minor variations from the stated value or characteristic', category: 'qualifier' },
  { phrase: 'approximately', description: 'Indicates a value that is close to but not necessarily exactly the stated value', category: 'qualifier' },
  { phrase: 'generally', description: 'Indicates a broad or approximate characteristic', category: 'qualifier' },
  { phrase: 'essentially', description: 'Indicates a characteristic that is fundamental or primary', category: 'qualifier' },
  { phrase: 'optionally', description: 'Indicates an element that may or may not be present', category: 'qualifier' },
  // Relationship phrases
  { phrase: 'operably coupled to', description: 'Indicates a functional connection between two elements', category: 'relationship' },
  { phrase: 'in communication with', description: 'Indicates a communicative connection between elements', category: 'relationship' },
  { phrase: 'disposed on', description: 'Indicates one element is placed on or over another', category: 'relationship' },
  { phrase: 'coupled to', description: 'Indicates a connection between two elements', category: 'relationship' },
  { phrase: 'connected to', description: 'Indicates a direct connection between two elements', category: 'relationship' },
  { phrase: 'adjacent to', description: 'Indicates proximity between two elements', category: 'relationship' },
  // Action phrases
  { phrase: 'configured to', description: 'Indicates a structural arrangement that enables a function', category: 'action' },
  { phrase: 'adapted to', description: 'Indicates suitability for a particular purpose', category: 'action' },
  { phrase: 'in accordance with', description: 'Indicates conformance with a standard or specification', category: 'action' },
  { phrase: 'based on', description: 'Indicates a dependency or derivation from another element', category: 'action' },
  // Claim structure
  { phrase: 'A method comprising the steps of:', description: 'Standard opening for a method claim', category: 'claim-structure' },
  { phrase: 'An apparatus comprising:', description: 'Standard opening for an apparatus claim', category: 'claim-structure' },
  { phrase: 'The [apparatus/method] of claim 1, wherein', description: 'Standard opening for a dependent claim', category: 'claim-structure' },
  { phrase: 'selected from the group consisting of', description: 'Introduces a Markush group of alternatives', category: 'claim-structure' },
  { phrase: 'one or more of', description: 'Specifies one or more alternatives', category: 'qualifier' },
  { phrase: 'further comprising', description: 'Adds additional elements to an open-ended claim', category: 'claim-structure' },
];
